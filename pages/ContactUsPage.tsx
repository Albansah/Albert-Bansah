import * as React from 'react';
import CheckCircleIcon from '../components/icons/CheckCircleIcon';

const ContactUsPage: React.FC = () => {
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [message, setMessage] = React.useState('');
    const [isSubmitted, setIsSubmitted] = React.useState(false);
    const [error, setError] = React.useState('');

    const handleWhatsAppClick = () => {
        const text = `Hello, I'd like to get in touch with Albansah.`;
        const whatsappUrl = `https://wa.me/16509121900?text=${encodeURIComponent(text)}`;
        window.open(whatsappUrl, '_blank');
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (!name || !email || !message) {
            setError('Please fill out all fields.');
            return;
        }
        // This is a simulation.
        console.log('Form submitted:', { name, email, message });
        setIsSubmitted(true);
        setName('');
        setEmail('');
        setMessage('');
    };

    return (
        <div className="bg-slate-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900">Get in Touch</h1>
                        <p className="mt-4 text-lg text-slate-600">
                            We'd love to hear from you! Whether you have a question, feedback, or need support, our team is here to help.
                        </p>
                    </div>

                    <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* Contact Info */}
                        <div className="space-y-8">
                             <div>
                                <h3 className="text-2xl font-bold text-slate-900">Contact Information</h3>
                                <p className="mt-2 text-slate-600">Reach out to us through any of the following channels.</p>
                            </div>
                             <div className="flex items-start">
                                <div className="flex-shrink-0 bg-blue-100 p-3 rounded-full">
                                    <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                </div>
                                <div className="ml-4">
                                    <h4 className="text-lg font-semibold text-slate-800">Email Us</h4>
                                    <p className="text-slate-600">For general inquiries and support.</p>
                                    <a href="mailto:support@albansah.com" className="text-blue-600 hover:underline font-medium">support@albansah.com</a>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className="flex-shrink-0 bg-blue-100 p-3 rounded-full">
                                    <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8c0 3.866-3.582 7-8 7a9.06 9.06 0 01-2.347-.306c-.52.263-1.639.742-3.468 1.105A9.06 9.06 0 018 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-5.462 1.523-7.233 3.822" /></svg>
                                </div>
                                <div className="ml-4">
                                    <h4 className="text-lg font-semibold text-slate-800">Chat with Us</h4>
                                    <p className="text-slate-600">Get instant support via WhatsApp.</p>
                                    <button onClick={handleWhatsAppClick} className="text-blue-600 hover:underline font-medium">Start a conversation</button>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="bg-white p-8 rounded-xl shadow-lg border border-slate-200">
                             {isSubmitted ? (
                                <div className="flex flex-col items-center justify-center h-full text-center">
                                    <CheckCircleIcon className="w-16 h-16 text-green-500" />
                                    <h3 className="mt-4 text-2xl font-bold text-slate-900">Message Sent!</h3>
                                    <p className="mt-2 text-slate-600">Thanks for reaching out. We'll get back to you as soon as possible.</p>
                                    <button onClick={() => setIsSubmitted(false)} className="mt-6 text-sm font-semibold text-blue-600 hover:underline">Send another message</button>
                                </div>
                             ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <h3 className="text-2xl font-bold text-slate-900 mb-4">Send us a Message</h3>
                                    <div>
                                        <label htmlFor="name" className="sr-only">Your Name</label>
                                        <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} placeholder="Your Name" className="w-full px-4 py-3 border border-slate-300 rounded-md focus:ring-blue-500 focus:border-blue-500"/>
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="sr-only">Your Email</label>
                                        <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Your Email" className="w-full px-4 py-3 border border-slate-300 rounded-md focus:ring-blue-500 focus:border-blue-500"/>
                                    </div>
                                    <div>
                                        <label htmlFor="message" className="sr-only">Your Message</label>
                                        <textarea id="message" value={message} onChange={e => setMessage(e.target.value)} rows={5} placeholder="Your Message" className="w-full px-4 py-3 border border-slate-300 rounded-md focus:ring-blue-500 focus:border-blue-500"></textarea>
                                    </div>
                                    {error && <p className="text-sm text-red-600">{error}</p>}
                                    <div>
                                        <button type="submit" className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all">Send Message</button>
                                    </div>
                                </form>
                             )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUsPage;