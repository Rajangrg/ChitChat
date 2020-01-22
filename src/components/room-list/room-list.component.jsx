import React from "react";
import './room-list.style.css'

class RoomList extends React.Component {
    render () {
        const orderedRooms = [...this.props.rooms]
        return (
            <div className="rooms-list">
                <ul>
                <h3>Your rooms:</h3>
                    {this.props.rooms.map(room => {
                        return (
                            <li key={room.id} className="room">
                                <button className='room-link'
                                    onClick={() => this.props.subscribeToRoom(room.id)}
                                    href="#">
                                    # {room.name}
                                </button>
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }
}

export default RoomList