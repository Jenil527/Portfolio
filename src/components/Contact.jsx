import React, { useState } from 'react';
import './Contact.css';

function Contact() {
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    // IMPORTANT: Get your free access key from https://web3forms.com/
    // and replace "YOUR_ACCESS_KEY_HERE" below
    const formData = new FormData(e.target);
    formData.append("access_key", "1c7b8870-dfc0-41fa-a575-f2b5e718d14c");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setStatus("Message sent successfully!");
        e.target.reset();
        setTimeout(() => setStatus(""), 4000);
      } else {
        setStatus("Failed to send message.");
        setTimeout(() => setStatus(""), 4000);
      }
    } catch (error) {
      setStatus("An error occurred. Please try again.");
      setTimeout(() => setStatus(""), 4000);
    }
  };

  return (
    <section className="section contact" id="contact">
      <div className="container contact-container">
        <h2 className="section-title">Get In Touch</h2>
        <div className="contact-content glass">
          <p className="contact-text">
            Have a question or want to work together? Fill out the form below and I'll get back to you as soon as possible.
          </p>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input type="email" name="email" placeholder="Your Email" required className="form-input" />
            </div>
            <div className="form-group">
              <input type="text" name="subject" placeholder="Subject" required className="form-input" />
            </div>
            <div className="form-group">
              <textarea name="message" placeholder="Your Message" rows="5" required className="form-input"></textarea>
            </div>
            <button type="submit" className="btn btn-primary contact-submit" disabled={status === "Sending..."}>
              {status === "Sending..." ? "Sending..." : "Send Message"}
            </button>
            {status && <p className="contact-text" style={{ marginTop: '1rem', color: 'var(--accent-color)', fontWeight: 'bold' }}>{status}</p>}
          </form>

          <div className="social-links">
            <a href="https://github.com/Jenil527" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
            </a>
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=pjenil60@gmail.com" target="_blank" rel="noopener noreferrer" aria-label="Email">
              <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </a>
            <a href="https://www.linkedin.com/in/jenil-patel-75634626b/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
          </div>
        </div>
      </div>
      <footer className="footer">
        <p>Thank you for your visit</p>
        <p>By Jenil Patel</p>
      </footer>
    </section>
  );
}

export default Contact;
