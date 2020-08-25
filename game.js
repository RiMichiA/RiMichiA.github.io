const textElement = document.getElementById("text")
const optionButtonsElement = document.getElementById("option-buttons")

let state = {}

function startGame() {
    state = {}
    showTextNode(1)
}

function showTextNode(textNodeIndex) {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    textElement.innerText = textNode.text
    while (optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }

    textNode.options.forEach(option => {
        if (showOption(option)) {
            const button = document.createElement("button")
            button.innerText = option.text
            button.classList.add("btn")
            button.addEventListener("click", () => selectOption(option))
            optionButtonsElement.appendChild(button)
        }
    })
}

function showOption(option) {
    return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
    const nextTextNodeId = option.nextText
    if (nextTextNodeId <= 0) {
        return startGame()
      }
    state = Object.assign(state, option.setState)
    showTextNode(nextTextNodeId)
}

const textNodes = [
    {
        id: 1,
        text: "Du wachst in einem Großraumbüro auf und ein Glas mit blauen Glibber setzt neben dir auf dem Tisch.",
        options: [
            {
                text: "Glas mitnhemen.",
                setState: { glibber: true },
                nextText: 2
            },
            {
                text: "Glas stehen lassen.",
                nextText: 2,
            }

        ]
    },
    {
        id: 2,
        text: "Wohin möchtest du gehen?",
        options: [
            {
                text: "In den Webinarraum.",
                nextText: 4
            },
            {
                text: "In das Videostudio.",
                nextText: 3
            },
            {
                text: "Sitzen bleiben.",
                nextText: 3
            },
        ]
    }

    {
        id: 3,
        text: " Als du am Tisch von Micha vorbeikommst spricht er dich auf den Glibber an und möchte ihn haben, er bietet dir sogar etwas dafür an.",
        options: [
            {
                text: "Glibber gegen Schokolade tauschen.",
                requiredState: (currentState) => currentState.glibber,
                setState: { glibber: false, schokolade: true },
                nextText: 3
            },
            {
                text: "Glibber gegen Kamera tauschen.",
                requiredState: (currentState) => currentState.glibber,
                setState: { glibber: false, kamera: true },
                nextText: 3
            },
            {
                text: "Glibber behalten.",
                nextText: 3
            },
        ]
    }

]


startGame()
