'use client';
import React from 'react';
import { cn } from '@/lib/utils';
import Lenis from 'lenis';
import { ZoomParallax } from "@/components/ui/zoom-parallax";

export default function DefaultDemo() {
	React.useEffect(() => {
		const lenis = new Lenis();
		function raf(time: number) {
			lenis.raf(time);
			requestAnimationFrame(raf);
		}
		requestAnimationFrame(raf);
		return () => {
			lenis.destroy();
		};
	}, []);

	const images = [
		{
			src: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80',
			alt: 'Artisanal Golden Crema Espresso',
		},
		{
			src: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80',
			alt: 'Aureffle Architectural Salon Interior',
		},
		{
			src: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&h=800&fit=crop&crop=entropy&auto=format&q=80',
			alt: 'Normandy AOP Butter Croissants',
		},
		{
			src: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80',
			alt: 'Live Siphon Extraction Ritual',
		},
		{
			src: 'https://images.unsplash.com/photo-1534778101976-62847782c213?w=800&h=800&fit=crop&crop=entropy&auto=format&q=80',
			alt: 'Handcrafted 24K Gold Latte Art',
		},
		{
			src: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80',
			alt: 'Rare Panama Geisha Roasted Beans',
		},
		{
			src: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80',
			alt: 'Kyoto 16-Hour Slow Cold Drip',
		},
	];

	return (
		<main className="min-h-screen w-full bg-[#080d1a] text-white">
			<div className="relative flex h-[50vh] flex-col items-center justify-center space-y-4 text-center px-4">
				{/* Radial spotlight */}
				<div
					aria-hidden="true"
					className={cn(
						'pointer-events-none absolute -top-1/2 left-1/2 h-[120vmin] w-[120vmin] -translate-x-1/2 rounded-full',
						'bg-[radial-gradient(ellipse_at_center,rgba(198,162,82,0.15),transparent_50%)]',
						'blur-[30px]',
					)}
				/>
				<span className="text-xs uppercase tracking-[0.25em] text-[#ffe600] font-semibold px-3.5 py-1.5 rounded-full border border-[#ffe600]/40 backdrop-blur-md">
					Multi-Layered Visual Experience
				</span>
				<h1 className="font-serif text-4xl sm:text-5xl font-normal text-white drop-shadow-md">
					Scroll Down for Zoom Parallax
				</h1>
				<p className="text-sm text-[#ded5c0]/80 font-light max-w-md">
					Experience our architectural salons, extraction rituals, and pastry geometries in fluid depth.
				</p>
			</div>
			<ZoomParallax images={images} />
			<div className="h-[20vh]"/>
		</main>
	);
}
