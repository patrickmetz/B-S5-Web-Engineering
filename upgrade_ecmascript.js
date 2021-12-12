class FullTextSearch {
    _inputFieldParentQuery;
    _inputFieldId = "filterSearch";
    _inputFieldPlaceholder = "Liste filtern";
    _inputFieldTitle = "Beliebigen Begriff eingeben. Groß- und Kleinschreibung ist egal.";
    _inputFieldElement;

    _searchQuery;
    _searchDelay = 1000;
    _searchDelayTimeout;
    _searchMatchClass = "searchMatch";
    _noSearchMatchClass = "noSearchMatch";

    /** Places an input field that will be used for a full text search
     * @param {string} inputFieldParentQuery css query for where the input field will be placed
     * @param {string} searchQuery css query for the elements whose innerText will be searched
     */
    constructor(inputFieldParentQuery, searchQuery) {
        this._searchQuery = searchQuery;
        this._inputFieldParentQuery = inputFieldParentQuery;

        this._placeInputField();
        this._addEventHandlerToInputField();
    }

    _placeInputField() {
        const parentElement = document.querySelector(this._inputFieldParentQuery);

        // doesn't destroy event handlers like innerHTML
        parentElement.insertAdjacentHTML("beforeend",
            `<input type="text" id="${this._inputFieldId}" 
                placeholder="${this._inputFieldPlaceholder}" 
                title="${this._inputFieldTitle}"/>`
        );
    }

    _addEventHandlerToInputField() {
        this._getInputField().onkeyup = () => {
            this._delaySearchStart();
        }
    }

    _getInputField() {
        if (this._inputFieldElement !== undefined) {
            return this._inputFieldElement;
        } else {
            this._inputFieldElement = document.getElementById(this._inputFieldId);
            return this._inputFieldElement;
        }
    }

    _delaySearchStart() {
        // begin delay again on every keystroke
        clearTimeout(this._searchDelayTimeout);

        // so search runs only if user doesn't type during delay
        this._searchDelayTimeout = setTimeout(() => {
            this._toggleInputField(true);
            this._searchAndMark();
        }, this._searchDelay)
    }

    _searchAndMark() {
        const searchValue = this._getInputField().value.trim().toLowerCase();

        if (searchValue === "") {
            this._clearMarks();
            this._clearInputField();
            this._toggleInputField(false);
            return;
        }

        const searchedElements = document.querySelectorAll(this._searchQuery);

        for (const element of searchedElements) {
            element.classList.remove(this._searchMatchClass, this._noSearchMatchClass)

            if (element.innerText.toLowerCase().indexOf(searchValue) === -1) {
                element.classList.add(this._noSearchMatchClass)
            } else {
                element.classList.add(this._searchMatchClass)
            }
        }

        this._toggleInputField(false);
    }

    _toggleInputField(disable) {
        if (disable === true) {
            this._getInputField().setAttribute("disabled", "disabled");
        } else {
            this._getInputField().removeAttribute("disabled");
        }
    }

    _clearMarks() {
        const parentElements = document.querySelectorAll(this._searchQuery);

        for (const parent of parentElements) {
            parent.classList.remove(this._searchMatchClass, this._noSearchMatchClass)
        }
    }

    _clearInputField() {
        this._getInputField().value = "";
    }
}

new FullTextSearch('#menuContent','section');

