import * as React from 'react';
import WhatsappIcon from './icons/WhatsappIcon';

const WhatsAppChatbot: React.FC = () => {
  const albertoAvatarUrl = 'https://media.licdn.com/dms/image/v2/D4E03AQG5mOfqv6rT7w/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1727032624944?e=1765411200&v=beta&t=5U6tpVHGBvaCwoo8hbnyYAOUoQmYpb_ykB9slbx3c2I';

  return (
    <a
      href="https://wa.me/16509121900"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-50 group flex items-center gap-3 cursor-pointer"
      aria-label="Chat with us on WhatsApp"
    >
      {/* Message Bubble - shown on hover on md screens and up */}
      <div className="hidden md:block bg-white text-slate-800 px-4 py-2 rounded-lg shadow-lg transition-all transform opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0">
        <p className="text-sm font-semibold">Chat with us directly here</p>
      </div>

      {/* Profile Picture and Icon */}
      <div className="relative w-16 h-16 transform group-hover:scale-110 transition-transform duration-300">
        <img
          src={albertoAvatarUrl}
          alt="Albert Bansah"
          className="w-full h-full rounded-full object-cover shadow-lg border-2 border-white"
        />
        <div className="absolute bottom-0 right-0 bg-[#25D366] w-6 h-6 rounded-full flex items-center justify-center border-2 border-white">
          <WhatsappIcon className="w-3 h-3 text-white" />
        </div>
      </div>
    </a>
  );
};

export default WhatsAppChatbot;