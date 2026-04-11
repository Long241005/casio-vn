import React, { useState } from "react";
import { MessageCircle, X, Phone } from "lucide-react";

export default function FloatingContact() {
  const [isOpen, setIsOpen] = useState(true);

  const contacts = [
    {
      id: 1,
      name: "Messenger",
      icon: "💬",
      color: "bg-blue-500 hover:bg-blue-600",
      link: "https://m.me/your-page",
    },
    {
      id: 2,
      name: "Zalo",
      icon: "Z",
      color: "bg-blue-500 hover:bg-blue-600",
      link: "https://zalo.me/your-number",
    },
    {
      id: 3,
      name: "WhatsApp",
      icon: "💚",
      color: "bg-green-500 hover:bg-green-600",
      link: "https://wa.me/your-number",
    },
    {
      id: 4,
      name: "Điện thoại",
      icon: "📞",
      color: "bg-green-500 hover:bg-green-600",
      link: "tel:+84123456789",
    },
  ];

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed right-8 bottom-8 w-16 h-16 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 z-50"
      >
        <MessageCircle size={32} />
      </button>
    );
  }

  return (
    <div className="fixed right-8 bottom-8 flex flex-col items-center gap-4 z-50">
      {/* Contact Buttons */}
      <div className="flex flex-col gap-4">
        {contacts.map((contact, index) => (
          <a
            key={contact.id}
            href={contact.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-16 h-16 ${contact.color} text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 font-bold text-xl cursor-pointer animate-fade-in`}
            style={{ animationDelay: `${index * 50}ms` }}
            title={contact.name}
          >
            {contact.icon}
          </a>
        ))}
      </div>

      {/* Close Button */}
      <button
        onClick={() => setIsOpen(false)}
        className="w-16 h-16 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
        title="Đóng"
      >
        <X size={28} />
      </button>
    </div>
  );
}
