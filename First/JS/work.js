const btn = document.getElementById("btn");

btn.addEventListener("click", () => {

   const emojis = ["🎉", "🎊", "🏆", "✨", "🥳", "🎈","😊", "🥰", "😘", "😍", "😆", "🤩", "🤗", "😎", "🎆", "🎇", "🧨", "✨", "🧧", "🎀", "🎁"];
    for(let i=0;i<80;i++){

        let emoji = document.createElement("div");
        emoji.classList.add("emoji");

        emoji.innerHTML =
            emojis[Math.floor(Math.random()*emojis.length)];

        emoji.style.left =
            Math.random()*window.innerWidth + "px";

        emoji.style.animationDuration =
            (Math.random()*3+2) + "s";

        document.body.appendChild(emoji);

        setTimeout(()=>{
            emoji.remove();
        },5000);
    }
});