let saldo = 100;

function placeBet() {
    const betAmount = parseInt(document.getElementById('bet-amount').value);
    const selectedCar = parseInt(document.getElementById('car-select').value);

    if (betAmount < 5 || betAmount > saldo) {
        alert("Por favor, insira um valor de aposta válido (mínimo R$5 e máximo igual ao seu saldo).");
        return;
    }

 
    saldo -= betAmount;

  
    const winner = Math.floor(Math.random() * 4) + 1; 

  
    if (selectedCar === winner) {
        saldo += betAmount * 2;
        alert("Parabéns! Você ganhou a aposta. Seu novo saldo é R$" + saldo + ".");
    } else {
        alert("Você perdeu a aposta. Seu saldo atual é R$" + saldo + ".");
    }
}

function startRace() {
    const betAmount = parseInt(document.getElementById('bet-amount').value);
    const selectedCar = parseInt(document.getElementById('car-select').value);

    if (betAmount < 5 || betAmount > saldo) {
        alert("Por favor, insira um valor de aposta válido (mínimo R$5 e máximo igual ao seu saldo).");
        return;
    }

    saldo -= betAmount;

    placeBet(); 

    const cars = document.querySelectorAll('.car');
    const finishLine = document.querySelector('.finish-line');
    const raceTrackWidth = document.querySelector('.race-track').offsetWidth;

    const raceDuration = 5000; 
    const carSpeeds = [Math.random() * 2, Math.random() * 2, Math.random() * 2, Math.random() * 2];
    const carDistances = [0, 0, 0, 0];
    const intervals = []; 

    cars.forEach((car, index) => {
        const interval = setInterval(() => {
            carDistances[index] += carSpeeds[index];
            car.style.left = carDistances[index] + 'px';

            if (carDistances[index] >= raceTrackWidth) {
                clearInterval(intervals[index]); 
                announceWinner(index + 1);
                stopOtherCars(index);
                console.log(saldo); // Exibe o saldo após a corrida
            }
        }, 20);
        intervals.push(interval); 
    });

    function announceWinner(winner) {
        alert('O carro ' + winner + ' venceu!');
    }

    function stopOtherCars(winnerIndex) {
        cars.forEach((car, index) => {
            if (index !== winnerIndex) {
                clearInterval(intervals[index]); 
            }
        });
    }
}

