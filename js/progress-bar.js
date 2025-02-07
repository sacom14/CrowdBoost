document.addEventListener('DOMContentLoaded', function () {
    const progressCircles = document.querySelectorAll('.progress-value');
    const progressInput = document.getElementById('progress-input');
    const radius = 90;
    const circumference = 2 * Math.PI * radius;
    const startAngle = 20;
    const endAngle = 340;
    const arcLength = (endAngle - startAngle) / 360 * circumference;

    function setProgress(percent, circle) {
        const progress = (percent / 100) * arcLength;
        const dashArray = `${progress} ${circumference}`;
        circle.style.strokeDasharray = dashArray;
    }

    progressInput.addEventListener('input', (e) => {
        let value = parseInt(e.target.value);
        if (value < 0) value = 0;
        if (value > 100) value = 100;
        setProgress(value, progressCircles[1]);
    });

    // Inicializar la barra de progreso dinámica
    setProgress(0, progressCircles[1]);
    // Ajustar el ángulo inicial
    progressCircles[1].style.transform = `rotate(${startAngle}deg)`;
    progressCircles[1].style.transformOrigin = 'center';

    // Inicializar la barra de progreso estática con valor 100
    setProgress(100, progressCircles[0]);
    progressCircles[0].style.transform = `rotate(${startAngle}deg)`;
    progressCircles[0].style.transformOrigin = 'center';
});
