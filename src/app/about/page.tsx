"use client"

import React from 'react'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { AboutSection } from '@/components/AboutSection'

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-background">
            <Navbar />
            <div className="pt-20">
                <AboutSection />
            </div>
            <Footer />
        </main>
    )
}
