// Just a simple form to create a new litter with text input fields 
// for the authors name and the text content of the litter (like a tweet)

import React from 'react';

const LitterCreate = () => {
    // const [author, setAuthor] = React.useState('');
    const [description, setDescription] = React.useState('');

    /* const handleAuthorChange = (event) => {
        setAuthor(event.target.value);
    }; */

    const handleContentChange = (event) => {
        setDescription(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch('https://cscloud8-229.lnu.se/api/v2/litter', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            // Vad ska en litter innehålla mer än description? owner, date, owner-id
            body: JSON.stringify({
                // author,
                description,
            }),
        });
        const data = await response.json();
    };

    return (
        <div>
            <h2>Create a New Litter</h2>
            <form onSubmit={handleSubmit}>
                {/*<label>
                    <input
                        type="text"
                        placeholder="Author"
                        value={author}
                        onChange={handleAuthorChange}
                    />
                </label> */}
                <label>
                    <input
                        type="text"
                        placeholder="Content"
                        value={description}
                        onChange={handleContentChange}
                    />
                </label>
                <button type="submit">Create Litter</button>
            </form>
        </div>
    );
}

export default LitterCreate;

