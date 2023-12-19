let passwordLength = 16;
        const inputEl = document.querySelector("#password");
        const upperCaseCheckEl = document.querySelector("#uppercase-check")
        const numberCheckEl = document.querySelector("#number-check")
        const symbolCheckEl = document.querySelector("#symbol-check");
        const securityIndicatorBarEl = document.querySelector("#security-indicator-bar");/*barra de segurança*/



        //generate a password
        function generatePassword(){

            let chars = "abcdefghjklmnpqrstuvwxyz"
            const upperCaseChars = "ABCDEFJHJKLMNPQRSTUVXWYZ";
            const numberChars = "123456789"
            const symbolChars = "!@&*()[]";

            if(upperCaseCheckEl.checked){
                chars += upperCaseChars;
            }
            if(numberCheckEl.checked){
                chars += numberChars;
            }
            if(symbolCheckEl.checked){
                chars += symbolChars;
            }

            let password = "";
            
            for(let i = 0; i < passwordLength;i++){
                const randomNumber = Math.floor(Math.random() * chars.length);
                password += chars.substring(randomNumber, randomNumber + 1);
            }
            inputEl.value = password;
            calculateQuality();
            calculateFontSize();
        }

        //calculate Quality
        function calculateQuality(){
            //20% - critico => 100% algo safe
            //passwordLenght tem o tamanho maximo de 64 caracteres
            //T*p1 + M*p2 + N*p3 + S*p4 = 100
            // 25% + 20% + 20% + 35% = 100%
            const percent = Math.round(
                ((passwordLength / 64) * 35
                + (upperCaseCheckEl.checked ? 20 : 0) 
                + (numberCheckEl.checked ? 20 : 0)
                + (symbolCheckEl.checked ? 25 : 0)
                )
                );
            securityIndicatorBarEl.style.width = `${percent}%`;
            if(percent > 69){
                securityIndicatorBarEl.classList.remove("critical")
                securityIndicatorBarEl.classList.remove("warning");
                securityIndicatorBarEl.classList.add("safe");
            }else if(percent > 50){
                securityIndicatorBarEl.classList.remove("critical")
                securityIndicatorBarEl.classList.remove("safe");
                securityIndicatorBarEl.classList.add("warning");
            }else{
                securityIndicatorBarEl.classList.remove("safe")
                securityIndicatorBarEl.classList.remove("warning");
                securityIndicatorBarEl.classList.add("critical");
            }
            if(percent >=100){
                securityIndicatorBarEl.classList.add("completed")
            }else{
                securityIndicatorBarEl.classList.remove("completed");
            }
        }
        //calculate font-size
        function calculateFontSize(){
            if(passwordLength > 45){
                inputEl.classList.remove('font-sm')
                inputEl.classList.remove('font-xs')
                inputEl.classList.add('font-xxs')
            }else if(passwordLength > 32){
                inputEl.classList.remove('font-sm')
                inputEl.classList.add('font-xs')
                inputEl.classList.remove('font-xxs')
            }else if(passwordLength > 22){
                inputEl.classList.add('font-sm')
                inputEl.classList.remove('font-xs')
                inputEl.classList.remove('font-xxs')
            }else{
                inputEl.classList.remove('font-sm')
                inputEl.classList.remove('font-xs')
                inputEl.classList.remove('font-xxs')
            }
        }


        //copy password
        function copy(){
            navigator.clipboard.writeText(inputEl.value);

        }


        const passwordLengthEl = document.querySelector("#password-length");
        passwordLengthEl.addEventListener("input", function(){
            passwordLength = passwordLengthEl.value;
            document.querySelector("#password-length-text").innerText = passwordLength;
            generatePassword();
        })

        upperCaseCheckEl.addEventListener("click", generatePassword);
        numberCheckEl.addEventListener("click", generatePassword);
        symbolCheckEl.addEventListener("click", generatePassword);


        document.querySelector("#copy-1").addEventListener("click", copy)
        document.querySelector("#copy-2").addEventListener("click", copy)
        document.querySelector("#renew").addEventListener("click", generatePassword);
        generatePassword();