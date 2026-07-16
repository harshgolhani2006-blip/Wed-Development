// =========================================
// VOLUNTEER FORM BACKEND
// =========================================

const volunteerForm =
document.getElementById("volunteerForm");

if (volunteerForm) {

    volunteerForm.addEventListener(
        "submit",
        async function (e) {

            e.preventDefault();

            const data = {

                name:
                volunteerForm.querySelector(
                    'input[type="text"]'
                ).value,

                email:
                volunteerForm.querySelector(
                    'input[type="email"]'
                ).value,

                phone:
                volunteerForm.querySelector(
                    'input[type="tel"]'
                ).value,

                interest:
                volunteerForm.querySelector(
                    'select'
                ).value
            };

            try {

                const response = await fetch(
                    "http://localhost:5000/api/volunteer",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type":
                            "application/json"
                        },
                        body:
                        JSON.stringify(data)
                    }
                );

                const result =
                await response.json();

                alert(result.message);

                volunteerForm.reset();

            } catch (error) {

                console.error(error);

                alert(
                    "Server connection failed."
                );
            }
        }
    );
}