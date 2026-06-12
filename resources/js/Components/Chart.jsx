import React, { useRef, useEffect } from 'react'

const COLORS = ['#36A2EB', '#FF6384', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#FF6384', '#C9CBCF']

export default function Chart({ type, labels, data, label }) {
    const canvasRef = useRef(null)
    const chartRef = useRef(null)

    useEffect(() => {
        const ctx = canvasRef.current?.getContext('2d')
        if (!ctx) return

        if (chartRef.current) {
            chartRef.current.destroy()
        }

        const config = {
            type,
            data: {
                labels,
                datasets: [{
                    label: label || '',
                    data,
                    backgroundColor: type === 'line' ? '#36A2EB' : COLORS.slice(0, data.length),
                    borderColor: '#36A2EB',
                    borderWidth: 2,
                    fill: type === 'line' ? false : undefined,
                }],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: type !== 'bar' && type !== 'line',
                        position: 'bottom',
                        labels: { boxWidth: 12, padding: 12, font: { size: 11 } },
                    },
                },
                scales: type === 'line' || type === 'bar' ? {
                    y: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.05)' } },
                    x: { grid: { display: false } },
                } : undefined,
            },
        }

        chartRef.current = new window.Chart(ctx, config)

        return () => {
            if (chartRef.current) {
                chartRef.current.destroy()
            }
        }
    }, [type, labels, data, label])

    return (
        <div className="h-64">
            <canvas ref={canvasRef} />
        </div>
    )
}
