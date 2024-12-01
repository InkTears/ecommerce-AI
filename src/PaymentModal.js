// src/PaymentModal.js
import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function PaymentModal({ isOpen, onRequestClose, onPayment }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('Card');

    const handleSubmit = (e) => {
        e.preventDefault();
        onPayment({ name, email, address, paymentMethod });
        onRequestClose();
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel="Payment Modal">
            <h2>Payment Information</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                    <label>Address:</label>
                    <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
                </div>
                <div>
                    <label>Payment Method:</label>
                    <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                        <option value="Card">Carte Bleue</option>
                        <option value="Cash">Espèces</option>
                    </select>
                </div>
                <button type="submit">Submit Payment</button>
            </form>
        </Modal>
    );
}

export default PaymentModal;