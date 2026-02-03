'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { solutions, type SolutionNavItem } from './solutionsData';
import Link from 'next/link';

const SolutionCard: React.FC<SolutionNavItem & { index: number }> = ({ 
  id, 
  navShortText, 
  pageH1, 
  headIntro, 
  datasheet, 
  icon: Icon, 
  image,
  index 
}) => {
  return (
    <Link href={`/solutions/${id}`} className="contents">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ 
        boxShadow: "0 0 20px rgba(34, 197, 94, 0.15)",
        borderColor: "rgba(34, 197, 94, 0.4)"
      }}
      whileTap={{ 
        scale: 0.98,
        boxShadow: "0 0 30px rgba(34, 197, 94, 0.25)"
      }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`
        relative overflow-hidden rounded-2xl group
        h-[360px]
        border border-white/10 transition-all duration-300
      `}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={image} 
          alt={pageH1}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />
      </div>

      {/* Content */}
      <div className="absolute inset-0 p-6 flex flex-col justify-end">
        <div className="transform transition-transform duration-300 group-hover:-translate-y-2">
          {/* Icon Badge */}
          <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-green-500/20 text-green-400 backdrop-blur-sm border border-green-500/30">
            <Icon className="w-6 h-6" />
          </div>

          <h3 className="font-bold text-white mb-2 text-2xl md:text-3xl">
            {pageH1}
          </h3>
          
          <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">
            {headIntro}
          </p>

          
        </div>
      </div>
    </motion.div>
    </Link>
  );
};

const Solutions: React.FC = () => {
  return (
    <div className="w-full bg-black py-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-16">
          <p className="text-sm text-gray-400 mb-2 font-mono">
            HOME / <span className="text-green-500">SOLUTIONS</span>
          </p>

          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
            NETWORK ORBITER <span className="text-green-500">WIRELESS SOLUTIONS</span>
          </h1>

          <p className="text-lg text-gray-400 max-w-3xl">
            Proven deployment scenarios for Rural Connectivity, WISP Infrastructure,
            Enterprise Networks, and Mission-Critical Wireless Systems.
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {solutions.map((solution, idx) => (
            <SolutionCard key={solution.navLabel} index={idx} {...solution} />
          ))}
        </div>

      </div>
    </div>
  );
};

export default Solutions;
