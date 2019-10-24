/*Created By: Austin Lomax
This code allows for the user to enter their information
*/
import React, { Component } from 'react';



class GetTag extends Component {
    clicked() {
        console.log('Info has been sent');
    }
    render() {
        return (
            <div>
                <h1>Get Tags</h1>
                <form>

                    <label>
                        Tag ID:
    <input type="text" name="tagid" />
                    </label>

                    <label>
                        Name:
    <input type="text" name="name" />
                    </label>
                </form>
                <button onClick={(e) => { e.preventDefault(); this.clicked(); }}> Send</button>
            </div>
        );
    }
}

export default GetTag;
