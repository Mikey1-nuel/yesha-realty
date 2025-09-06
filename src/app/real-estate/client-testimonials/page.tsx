'use client'; // 👈 Ensures this component is rendered only on the client

import React, { useEffect, useState } from 'react';
import '../../style/client-testimonials.css';

type Testimonial = {
  name: string;
  quote: string;
  photo: string;
  property: string;
  rating: number;
};

const firstNames = ['Adaobi', 'Chinedu', 'Ifeanyi', 'Ngozi', 'Emeka', 'Zainab', 'Tunde', 'Kemi', 'Yusuf', 'Amaka'];
const lastInitials = ['A.', 'B.', 'C.', 'D.', 'E.', 'F.', 'G.', 'H.', 'I.', 'J.'];
const quotes = [
  'Yesha Reality made my home search effortless!',
  'Professional, reliable, and fast!',
  'I got the best deal in Abuja thanks to Yesha.',
  'Stress-free experience from start to finish.',
  'Highly recommend their services!',
  'They truly understand the Abuja market.',
  'Smooth transaction and great communication.',
  'Found my dream home in no time!',
  'Excellent service and transparency.',
  'Top-notch agents and listings!'
];
const propertyTypes = ['Bungalow', 'Duplex', 'Terrace', 'Penthouse'];
const neighborhoods = ['Maitama', 'Gwarinpa', 'Asokoro', 'Jabi', 'Wuse', 'Lugbe', 'Lokogoma', 'Utako', 'Katampe', 'Kubwa'];

function generateTestimonials(count = 200) {
  const testimonials = [];
  for (let i = 0; i < count; i++) {
    const name = `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastInitials[Math.floor(Math.random() * lastInitials.length)]}`;
    const quote = quotes[Math.floor(Math.random() * quotes.length)];
    const photo = `https://i.pravatar.cc/80?img=${(i % 70) + 1}`;
    const property = `${Math.floor(Math.random() * 5) + 2}-Bedroom ${propertyTypes[Math.floor(Math.random() * propertyTypes.length)]} in ${neighborhoods[Math.floor(Math.random() * neighborhoods.length)]}`;
    const rating = Math.floor(Math.random() * 5) + 1;

    testimonials.push({ name, quote, photo, property, rating });
  }
  return testimonials;
}

function getInitials(name: string): string {
  if (!name) return '';
  const parts = name.trim().split(' ');
  return parts.slice(0, 2).map(p => p[0].toUpperCase()).join('');
}

export default function ClientTestimonials() {
  const [visibleTestimonials, setVisibleTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    const allTestimonials = generateTestimonials();
    const currentMonth = new Date().getMonth();
    const startIndex = (currentMonth * 5) % allTestimonials.length;
    const selected = allTestimonials.slice(startIndex, startIndex + 5);
    setVisibleTestimonials(selected);
  }, []);

  return (
    <section className="testimonials">
      <h2>Client Testimonials</h2>
      <div className="testimonial-list">
        {visibleTestimonials.map((t, index) => (
          <div key={index} className="testimonial-card">
            <div className="initials-circle">{getInitials(t.name)}</div>
            <p className="quote">“{t.quote}”</p>
            <p className="name">{t.name}</p>
            <p className="property">{t.property}</p>
            <p className="rating">⭐️ {t.rating} / 5</p>
          </div>
        ))}
      </div>
    </section>
  );
}
