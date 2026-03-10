import React, { useState } from 'react';
import { Mail, Linkedin, Github, Send, Phone } from 'lucide-react';
import { personalInfo } from '../../data/portfolioData';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Create mailto link
    const subject = `Portfolio Contact from ${formData.name}`;
    const body = `Name: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0A%0D%0AMessage:%0D%0A${formData.message}`;
    window.location.href = `mailto:${personalInfo.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="px-6 py-24 md:px-12 lg:px-24">
      
      {/* Section Header */}
      <div className="mb-16 flex flex-col items-center justify-center text-center">
        <h2 className="mb-4 text-4xl font-bold text-white md:text-5xl">Let's Connect</h2>
        <div className="h-1 w-20 bg-emerald-500 mb-6"></div>
        <p className="max-w-2xl text-lg text-zinc-400">
          Have a project in mind or want to discuss opportunities? I'd love to hear from you.
        </p>
      </div>

      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">

          {/* Left Column: Contact Cards */}
          <div className="flex flex-col gap-8">
            <h3 className="text-2xl font-bold text-white">Get in Touch</h3>
            
            <div className="flex flex-col gap-4">
              {/* Email Card */}
              <a 
                href={`mailto:${personalInfo.email}`}
                className="group flex items-center gap-4 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5 transition-all hover:border-emerald-500/50 hover:bg-zinc-900"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-800/80 text-emerald-500 transition-colors group-hover:bg-emerald-500/20">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white">Email</h4>
                  <p className="text-sm text-zinc-400 group-hover:text-emerald-400 transition-colors">Send me a message</p>
                </div>
              </a>

              {/* LinkedIn Card */}
              <a 
                href={personalInfo.linkedin}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-4 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5 transition-all hover:border-emerald-500/50 hover:bg-zinc-900"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-800/80 text-emerald-500 transition-colors group-hover:bg-emerald-500/20">
                  <Linkedin size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white">LinkedIn</h4>
                  <p className="text-sm text-zinc-400 group-hover:text-emerald-400 transition-colors">Connect with me</p>
                </div>
              </a>

               {/* GitHub Card */}
               <a 
                href={personalInfo.github}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-4 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5 transition-all hover:border-emerald-500/50 hover:bg-zinc-900"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-800/80 text-emerald-500 transition-colors group-hover:bg-emerald-500/20">
                  <Github size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white">GitHub</h4>
                  <p className="text-sm text-zinc-400 group-hover:text-emerald-400 transition-colors">View my projects</p>
                </div>
              </a>

              {/* Call Card */}
              <a 
                href={`tel:${personalInfo.phone}`}
                className="group flex items-center gap-4 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5 transition-all hover:border-emerald-500/50 hover:bg-zinc-900"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-800/80 text-emerald-500 transition-colors group-hover:bg-emerald-500/20">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white">Call</h4>
                  <p className="text-sm text-zinc-400 group-hover:text-emerald-400 transition-colors">Available on phone</p>
                </div>
              </a>

            </div>
          </div>

          {/* Right Column: Form */}
          <div className="flex flex-col gap-8">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-sm font-medium text-zinc-400">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-zinc-100 placeholder-zinc-600 outline-none transition-all focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-medium text-zinc-400">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-zinc-100 placeholder-zinc-600 outline-none transition-all focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-sm font-medium text-zinc-400">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Tell me about your project or opportunity..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full resize-none rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-zinc-100 placeholder-zinc-600 outline-none transition-all focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500"
                ></textarea>
              </div>

              <button
                type="submit"
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-6 py-4 text-base font-bold text-zinc-950 transition-all hover:bg-emerald-400 hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] active:scale-[0.98]"
              >
                Send Message
                <Send size={18} />
              </button>
            </form>
          </div>

        </div>

        <p className="mt-24 text-center text-xs text-zinc-600">
          © {new Date().getFullYear()} {personalInfo.name}. Built with React & Tailwind.
        </p>
      </div>
    </section>
  );
};

export default Contact;