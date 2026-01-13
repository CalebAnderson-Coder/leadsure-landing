#!/usr/bin/env python3
"""
Landing Page Callback API
Handles 'Have AI Call You' requests from the landing page.
Uses Twilio to call the visitor and connect them to the GHL AI Receptionist.
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
from twilio.rest import Client
from twilio.twiml.voice_response import VoiceResponse
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)  # Allow requests from landing page

# Twilio config
TWILIO_ACCOUNT_SID = os.getenv("TWILIO_ACCOUNT_SID")
TWILIO_AUTH_TOKEN = os.getenv("TWILIO_AUTH_TOKEN")
TWILIO_PHONE_NUMBER = os.getenv("TWILIO_PHONE_NUMBER")

# GHL AI Receptionist number
AI_RECEPTIONIST_NUMBER = "+15183517331"

# Your server's public URL (update this when deploying)
SERVER_URL = os.getenv("SERVER_URL", "http://localhost:5000")

client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)


def clean_phone(phone: str) -> str:
    """Clean and format phone number to E.164."""
    if not phone:
        return None
    digits = ''.join(c for c in phone if c.isdigit())
    if len(digits) == 10:
        return f"+1{digits}"
    elif len(digits) == 11 and digits.startswith('1'):
        return f"+{digits}"
    return None


@app.route('/api/callback', methods=['POST'])
def request_callback():
    """
    Endpoint to request a callback from the AI Receptionist.
    The visitor enters their phone number, and we:
    1. Call them using Twilio
    2. When they answer, connect them to the AI Receptionist
    """
    data = request.get_json()
    
    if not data or 'phone' not in data:
        return jsonify({'error': 'Phone number required'}), 400
    
    visitor_phone = clean_phone(data['phone'])
    
    if not visitor_phone:
        return jsonify({'error': 'Invalid phone number'}), 400
    
    try:
        # Create a call to the visitor that will connect them to the AI
        call = client.calls.create(
            to=visitor_phone,
            from_=TWILIO_PHONE_NUMBER,
            url=f"{SERVER_URL}/api/callback/connect",
            status_callback=f"{SERVER_URL}/api/callback/status",
            status_callback_event=['completed']
        )
        
        return jsonify({
            'success': True,
            'message': 'Call initiated! Your phone will ring shortly.',
            'call_sid': call.sid
        })
        
    except Exception as e:
        return jsonify({
            'error': str(e),
            'message': 'Failed to initiate call. Please try again or call directly.'
        }), 500


@app.route('/api/callback/connect', methods=['POST'])
def connect_to_ai():
    """
    TwiML endpoint that connects the answered call to the AI Receptionist.
    This plays a brief intro message and then dials the AI number.
    """
    response = VoiceResponse()
    
    # Brief intro message
    response.say(
        "Thanks for requesting a demo of our AI Receptionist. "
        "Please hold while we connect you.",
        voice='alice'
    )
    
    # Connect to the AI Receptionist
    response.dial(
        AI_RECEPTIONIST_NUMBER,
        caller_id=TWILIO_PHONE_NUMBER,
        timeout=30
    )
    
    return str(response), 200, {'Content-Type': 'application/xml'}


@app.route('/api/callback/status', methods=['POST'])
def call_status():
    """Webhook for call status updates (for tracking/analytics)."""
    call_sid = request.form.get('CallSid')
    call_status = request.form.get('CallStatus')
    call_duration = request.form.get('CallDuration', 0)
    
    print(f"[CALLBACK] Call {call_sid}: {call_status} (Duration: {call_duration}s)")
    
    return '', 200


@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint."""
    return jsonify({'status': 'ok', 'service': 'callback-api'})


if __name__ == '__main__':
    print("=" * 60)
    print("Landing Page Callback API")
    print("=" * 60)
    print(f"Twilio Number: {TWILIO_PHONE_NUMBER}")
    print(f"AI Receptionist: {AI_RECEPTIONIST_NUMBER}")
    print("-" * 60)
    print("Endpoints:")
    print("  POST /api/callback - Request a callback")
    print("  GET  /health       - Health check")
    print("=" * 60)
    
    app.run(host='0.0.0.0', port=5000, debug=True)
