import { h } from 'preact';

export function Alerts({ alerts, onAlerts }) {
	const close = (a) => onAlerts(alerts.filter((_a) => _a !== a));
	return (
		<div className="">
			{alerts.map((a) => (
				<Alert text={a[0]} color={a[1] || 'red'} className="mb-5" onClose={() => close(a)} />
			))}
		</div>
	);
}

export function Alert({ text, color, onClose }) {
	// this is annoying but wihout the static string purgecss can't pick them up
	const classes = {
		red: {
			border: 'border-red-400',
			bg: 'bg-red-100',
			text: 'text-red-700',
			text1: 'text-red-500',
		},
		yellow: {
			border: 'border-yellow-400',
			bg: 'bg-yellow-100',
			text: 'text-yellow-700',
			text1: 'text-yellow-500',
		},
		green: {
			border: 'border-green-400',
			bg: 'bg-green-100',
			text: 'text-green-700',
			text1: 'text-green-500',
		},
		blue: {
			border: 'border-blue-400',
			bg: 'bg-blue-100',
			text: 'text-blue-700',
			text1: 'text-blue-500',
		},
	};
	const cls = classes[color];
	return (
		<div className={`${cls.bg} border ${cls.border} ${cls.text} px-4 py-3 relative`} role="alert">
			<span class="block sm:inline">{text}</span>
			<span class="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={onClose}>
				<svg
					className={`fill-current h-6 w-6 ${cls.text1}`}
					role="button"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
				>
					<title>Close</title>
					<path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
				</svg>
			</span>
		</div>
	);
}
