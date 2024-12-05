import { useEffect, useState } from "react"

interface CountDownTimerProps {
	initialSeconds: number
	setTimerActive: React.Dispatch<React.SetStateAction<boolean>>
}

function CountDownTimer({
	initialSeconds,
	setTimerActive,
}: CountDownTimerProps) {
	const [seconds, setSeconds] = useState(initialSeconds)
	function remainingTime() {
		if (seconds > 0) {
			setTimeout(() => setSeconds(seconds - 1), 1000)
		}
	}

	useEffect(() => {
		if (seconds === 0) {
			setTimerActive(false)
			return
		}

		const timer = setInterval(() => {
			if (seconds > 0) setSeconds(seconds - 1)
		}, 1000)

		return () => clearInterval(timer)
	})

	return (
		<span>{`${Math.floor(seconds / 60)} minutes and ${
			seconds % 60
		} seconds`}</span>
	)
}

export default CountDownTimer
