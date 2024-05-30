let currentStep = 1;
const totalSteps = 3;

const results = [
    {
        image: "https://images.unsplash.com/photo-1611269971682-4d093e7c8f63?q=80&w=1287",
        title: "Chleb żytni",
        content: "Twój chleb to chleb żytni, ponieważ cenisz sobie tradycję i wyraziste smaki. Jesteś osobą, która docenia zdrowe i pożywne jedzenie, a jednocześnie lubi eksperymentować z różnorodnymi dodatkami."
    },
    {
        image: "https://thevegan8.com/wp-content/uploads/2022/10/vegan-easy-oil-free-pumpernickel-bread-recipe7.jpg",
        title: "Pumpernikiel",
        content: "Twój chleb to pumpernikiel, ponieważ masz wyjątkowy gust i lubisz głębokie, słodkawe smaki. Jesteś osobą, która ceni sobie oryginalność i chętnie sięga po nietypowe rozwiązania kulinarne."
    },
    {
        image: "https://images.unsplash.com/photo-1598373182133-52452f7691ef?q=80&w=1170",
        title: "Chleb pszenny",
        content: "Twój chleb to chleb pszenny, ponieważ preferujesz klasykę i uniwersalność w kuchni. Jesteś osobą, która ceni sobie prostotę i możliwość komponowania różnorodnych potraw, zarówno słodkich, jak i słonych."
    },
    {
        image: "https://images.unsplash.com/photo-1632931057819-4eefffa8e007?q=80&w=1287",
        title: "Chlebek bananowy",
        content: "Twój chleb to chlebek bananowy, ponieważ lubisz słodkie, domowe smaki, które kojarzą się z beztroskim dzieciństwem. Jesteś osobą, która ceni sobie komfort i chętnie sięga po przysmaki, które poprawiają nastrój."
    }
];

function updateForm() {
    for (let i = 1; i <= 9; i++) {
        document.getElementById(`row${i}`).style.display = "none";
    }
    
    const startRow = (currentStep - 1) * 3 + 1;
    for (let i = startRow; i < startRow + 3; i++) {
        document.getElementById(`row${i}`).style.display = "table-row";
    }

    document.getElementById('radioButtons').style.display = currentStep === 1 ? 'flex' : 'none';
    
    const progress = document.getElementById("progress");
    const progressText = document.getElementById("progressText");
    progress.style.width = `${(currentStep / totalSteps) * 100}%`;
    progressText.textContent = `Etap ${currentStep}/${totalSteps}`;
    
    document.getElementById("prevButton").disabled = currentStep === 1;
    document.getElementById("nextButton").style.display = currentStep === totalSteps ? "none" : "inline-block";
    document.getElementById("submitButton").style.display = currentStep === totalSteps ? "inline-block" : "none";
}

let selectedButtons = [];

function toggleCheckbox(div) {
    div.classList.toggle("checked");
    if (div.classList.contains("checked")) {
        div.setAttribute("checked", true);
    } else {
        div.removeAttribute("checked");
    }
}



function nextStep() {
    if (currentStep < totalSteps) {
        if (verifyPart(currentStep)) {
            currentStep++;
            updateForm();
        }
    }
}

function verifyPart(step) {
    let valid = true;
    let errorMessage = '';

    switch(step) {
        case 1:
            const checkboxes = document.querySelectorAll('.checkbox-btn[checked]');
            if (checkboxes.length === 0) {
                valid = false;
                errorMessage += '✖ Wybierz przynajmniej jedną opcję. \n';
            }
            if (!/^[a-zA-Z]+$/.test(document.getElementById('fname').value.trim())) {
                valid = false;
                errorMessage += '✖ Imię jest wymagane i powinno zawierać tylko litery. \n';
            }
            if (!/^[a-zA-Z]+$/.test(document.getElementById('fsurname').value.trim())) {
                valid = false;
                errorMessage += '✖ Nazwisko jest wymagane i powinno zawierać tylko litery. \n';
            }
            if (!document.getElementById('fbirthday').value.trim()) {
                valid = false;
                errorMessage += '✖ Data urodzenia jest wymagana. \n';
            }
            break;
        case 2:
            if (!/^[a-zA-Z0-9\s,.-]+$/.test(document.getElementById('faddress').value.trim())) {
                valid = false;
                errorMessage += '✖ Adres jest nieprawidłowy. \n';
            }
            if (!/^[a-zA-Z\s]+$/.test(document.getElementById('fcity').value.trim())) {
                valid = false;
                errorMessage += '✖ Miejscowość jest nieprawidłowa. ';
            }
            if (!/^[0-9]{2}-[0-9]{3}$/.test(document.getElementById('fkp').value.trim())) {
                valid = false;
                errorMessage += '✖ Kod pocztowy jest nieprawidłowy. ';
            }
            break;
        case 3:
            if (!/^\d{16}$/.test(document.getElementById('fcard').value.trim())) {
                valid = false;
                errorMessage += '✖ Numer karty jest nieprawidłowy. ';
            }
            if (!/^\d{3}$/.test(document.getElementById('fcvv').value.trim())) {
                valid = false;
                errorMessage += '✖ Numer CVV jest nieprawidłowy. ';
            }
            if (!document.getElementById('fexpiry').value.trim()) {
                valid = false;
                errorMessage += '✖ Data wygaśnięcia jest wymagana. ';
            }
            break;
    }

    const errorDiv = document.getElementById('errorMessage');
    if (!valid) {
        errorDiv.style.display = 'block';
        errorDiv.textContent = errorMessage;
    } else {
        errorDiv.style.display = 'none';
        errorDiv.textContent = '';
    }

    return valid;
}

function prevStep() {
    if (currentStep > 1) {
        currentStep--;
        updateForm();
    }
}

function verifySend() {
    document.getElementById("nextButton").style.display = "none";
    document.getElementById("submitButton").style.display = "none";
    document.getElementById("prevButton").style.display = "none";
    let formData = {};

    formData["Imię"] = document.getElementById('fname').value.trim();
    formData["Nazwisko"] = document.getElementById('fsurname').value.trim();
    formData["Data urodzenia"] = document.getElementById('fbirthday').value.trim();
    formData["Adres"] = document.getElementById('faddress').value.trim();
    formData["Miejscowość"] = document.getElementById('fcity').value.trim();
    formData["Kod pocztowy"] = document.getElementById('fkp').value.trim();
    formData["Numer karty"] = document.getElementById('fcard').value.trim();
    formData["Numer CVV"] = document.getElementById('fcvv').value.trim();
    formData["Data wygaśnięcia"] = document.getElementById('fexpiry').value.trim();

    localStorage.setItem('formData', JSON.stringify(formData));

    document.getElementById('form-table').style.display = 'none';

    const templateText = document.createElement('div');
    templateText.id = 'templateText';
    templateText.innerHTML = '<p>Twoje zamówienie zostało złożone!</p><p>Wybrane opcje:</p>';
    document.getElementById('form-container').appendChild(templateText);

    const selectedContent = document.createElement('div');
    selectedContent.id = 'selectedContent';

    const selectedButtons = document.querySelectorAll('.checkbox-btn.checked');
    selectedButtons.forEach(button => {
        const image = button.style.backgroundImage.replace(/url\(['"]?(.*?)['"]?\)/i, '$1');
        const title = button.querySelector('.checkboxtitle').textContent;
        const selectedButton = createButton(image, title); 
        selectedContent.appendChild(selectedButton);
    });
    document.getElementById('form-container').appendChild(selectedContent);
    const returnButton = document.createElement('button');
    returnButton.id = 'returnButton';
    returnButton.textContent = 'Powrót do strony głównej';
    returnButton.onclick = function() {
        localStorage.removeItem('formData');
        window.location.href = 'index.html'; 
    };
    document.getElementById('form-container').appendChild(returnButton);
}

function createButton(image, title) {
    const button = document.createElement('div');
    button.classList.add('checkbox-btn');
    button.style.backgroundImage = `url(${image})`;
    button.innerHTML = '<p class=\'checkboxtitle\'>' + title + '</p>';
    button.onclick = function() {
        toggleCheckbox(this);
    };
    return button;
}

function renderButtons(data) {
    const radioButtons = document.getElementById('radioButtons');
    data.forEach((item, index) => {
        const button = createButton(item.image, item.title);
        button.id = `btn${index + 1}`;
        radioButtons.appendChild(button);
    });
}

function renderAll() {
    renderButtons(results);
    updateForm();
}

