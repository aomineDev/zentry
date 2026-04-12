import React, { useEffect, useRef, useState } from 'react'
import { TiLocationArrow } from 'react-icons/ti'
import Button from './Button'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'

gsap.registerPlugin(ScrollTrigger)

const Hero = () => {
	const [currentIndex, setCurrentIndex] = useState(1)
	const [hasClicked, setHasClicked] = useState(false)
	const [isLoading, setIsLoading] = useState(true)
	const [loadedVideos, setLoadedVideos] = useState(0)

	const [oddBgIndex, setOddBgIndex] = useState(1)
	const [evenBgIndex, setEvenBgIndex] = useState(1)
	const [isCurrentIndexEven, setIsCurrentIndexEven] = useState(false)

	const nextVideoRef = useRef(null)

	const totalVideos = 4

	const isIndexEven = currentIndex % 2 === 0

	const upcomingVideoIndex = (currentIndex % totalVideos) + 1

	const handleVideoLoad = () => {
		setLoadedVideos((prev) => prev + 1)

		updateIsLoading()
	}

	const updateIsLoading = () => {
		if (loadedVideos === totalVideos - 1) {
			setIsLoading(false)
		}
	}

	const handleMiniVdClick = () => {
		setHasClicked(true)

		setCurrentIndex(upcomingVideoIndex)

		if (upcomingVideoIndex % 2 === 0) {
			setEvenBgIndex(upcomingVideoIndex)
		} else {
			setOddBgIndex(upcomingVideoIndex)
		}
	}

	useEffect(() => {
		updateIsLoading()
	}, [loadedVideos])

	useGSAP(
		() => {
			if (hasClicked) {
				gsap.set('#next-video', { visibility: 'visible' })

				gsap.to('#next-video', {
					width: '100%',
					height: '100%',
					duration: 1,
					ease: 'power1.inOut',
					onStart: () => nextVideoRef.current.play(),
					onComplete: () => {
						setIsCurrentIndexEven(currentIndex % 2 === 0)
					},
				})

				gsap.from('#current-video', {
					transformOrigin: 'center center',
					scale: 0,
					duration: 1,
					delay: 0.5,
					ease: 'power.inOut',
				})
			}
		},
		{ dependencies: [currentIndex], revertOnUpdate: true },
	)

	useGSAP(() => {
		gsap.set('#video-frame', {
			clipPath: 'polygon(14% 0%, 72% 0%, 90% 90%, 0% 100%)',
			borderRadius: '0 0 40% 10%',
		})

		gsap.from('#video-frame', {
			clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
			borderRadius: '0 0 0 0',
			ease: 'power1.inOut',
			scrollTrigger: {
				trigger: '#video-frame',
				start: 'center center',
				end: 'bottom center',
				scrub: true,
			},
		})
	})

	const getVideoSrc = (index) => `videos/hero-${index}.mp4`

	return (
		<div className="relative h-dvh w-screen overflow-x-hidden">
			{isLoading && (
				<div className="flex-center absolute z-100 h-dvh w-screen overflow-hidden bg-violet-50">
					<div className="three-body">
						<div className="three-body__dot"></div>
						<div className="three-body__dot"></div>
						<div className="three-body__dot"></div>
					</div>
				</div>
			)}
			<div
				id="video-frame"
				className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-50"
			>
				<div className=" absolute-center z-30 size-64 cursor-pointer overflow-hidden rounded-lg group">
					<div
						onClick={handleMiniVdClick}
						className="origin-center scale-50 opacity-0 transition-all duration-300 ease-in group-hover:scale-100 group-hover:opacity-100"
					>
						<video
							loop
							muted
							src={getVideoSrc(upcomingVideoIndex)}
							id="current-video"
							className="size-64 origin-center object-cover object-center"
							onLoadedData={handleVideoLoad}
						></video>
					</div>
				</div>

				<video
					ref={nextVideoRef}
					src={getVideoSrc(currentIndex)}
					loop
					muted
					id="next-video"
					className="absolute object-cover object-center absolute-center invisible z-20 size-64"
					onLoadedData={handleVideoLoad}
				></video>

				<video
					src={getVideoSrc(oddBgIndex)}
					autoPlay
					loop
					muted
					className={`absolute object-cover object-center left-0 top-0 size-full  ${isCurrentIndexEven ? 'invisible' : ''}`}
					onLoadedData={handleVideoLoad}
					id="bg-video"
				></video>

				<video
					src={getVideoSrc(evenBgIndex)}
					autoPlay
					loop
					muted
					className={`absolute object-cover object-center left-0 top-0 size-full  ${isCurrentIndexEven ? '' : 'invisible'}`}
					onLoadedData={handleVideoLoad}
					id="bg-video"
				></video>

				<h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-50">
					G<b>a</b>ming
				</h1>

				<div className="absolute left-0 top-0 z-40 size-full pointer-events-none">
					<div className="mt-24 px-5 sm:px-10">
						<h1 className="special-font hero-heading text-blue-100">
							redefi<b>n</b>e
						</h1>
						<p className="mb-5 max-w-64 font font-robert text-blue-100">
							Enter the Metagame Layer <br /> unleash the Play Economy
						</p>

						<Button
							id="watch-trailer"
							title="Watch Trailer"
							leftIcon={<TiLocationArrow />}
							containerClass="!bg-lime-300 flex-center gap-1"
						></Button>
					</div>
				</div>
			</div>
			<h1 className="special-font hero-heading absolute bottom-5 right-5 z-5 text-black">
				G<b>a</b>ming
			</h1>
		</div>
	)
}

export default Hero
