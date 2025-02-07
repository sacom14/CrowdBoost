document.addEventListener('DOMContentLoaded', function () {
    const donateForm = document.getElementById('donate-form');
    const bankDetailsForm = document.getElementById('bank-details-form');
    const bankDetailsModal = document.getElementById('bank-details-modal');
    const closeModal = document.querySelector('.close');
    const toast = document.getElementById('toast');
    const totalAmount = 5000;

    // Initialize the collected amount in localStorage
    if (!localStorage.getItem('collectedAmount')) {
        localStorage.setItem('collectedAmount', '200');
    }

    function showError(input, message) {
        const errorLabel = document.createElement('label');
        errorLabel.className = 'error';
        errorLabel.style.color = 'red';
        errorLabel.innerText = message;
        input.parentElement.appendChild(errorLabel);
    }

    function clearErrors(form) {
        const errors = form.querySelectorAll('.error');
        errors.forEach(error => error.remove());
    }

    function validateForm(form) {
        clearErrors(form);
        let isValid = true;
        const inputs = form.querySelectorAll('input, select');
        inputs.forEach(input => {
            if (!input.value.trim()) {
                showError(input, 'Este campo es obligatorio');
                isValid = false;
            } else if (input.type === 'email' && !validateEmail(input.value)) {
                showError(input, 'Introduce un email válido');
                isValid = false;
            } else if (input.type === 'number' && input.value <= 0) {
                showError(input, 'Introduce un valor positivo');
                isValid = false;
            } else if (input.id === 'card-number' && !validateCardNumber(input.value)) {
                showError(input, 'Introduce un número de tarjeta válido');
                isValid = false;
            } else if (input.id === 'expiry-date' && !validateExpiryDate(input.value)) {
                showError(input, 'Introduce una fecha de expiración válida');
                isValid = false;
            } else if (input.id === 'cvv' && !validateCVV(input.value)) {
                showError(input, 'Introduce un CVV válido');
                isValid = false;
            }
        });
        return isValid;
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    function validateCardNumber(cardNumber) {
        const re = /^\d{16}$/;
        return re.test(cardNumber);
    }

    function validateExpiryDate(expiryDate) {
        const re = /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/;
        return re.test(expiryDate);
    }

    function validateCVV(cvv) {
        const re = /^[0-9]{3,4}$/;
        return re.test(cvv);
    }

    donateForm.addEventListener('submit', function (event) {
        event.preventDefault();
        if (validateForm(donateForm)) {
            bankDetailsModal.style.display = 'block';
        }
    });

    bankDetailsForm.addEventListener('submit', function (event) {
        event.preventDefault();
        if (validateForm(bankDetailsForm)) {
            const amountInput = donateForm.querySelector('#amount');
            const amount = parseInt(amountInput.value);
            const collectedAmount = parseInt(localStorage.getItem('collectedAmount')) + amount;
            localStorage.setItem('collectedAmount', collectedAmount.toString());
            updateProgress();
            showToast('Se ha realizado el pago correctamente', 'success');
            bankDetailsModal.style.display = 'none';
            bankDetailsForm.reset();
            donateForm.reset();
        } else {
            showToast('Error en el pago', 'error');
        }
    });

    closeModal.addEventListener('click', function () {
        bankDetailsModal.style.display = 'none';
    });

    function showToast(message, type) {
        toast.innerText = message;
        toast.className = `toast ${type}`;
        toast.style.display = 'block';
        setTimeout(() => {
            toast.style.display = 'none';
        }, 3000);
    }

    function updateProgress() {
        const event = new CustomEvent('updateProgress');
        document.dispatchEvent(event);
    }
});