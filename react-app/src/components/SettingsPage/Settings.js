import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { editPosition, editName } from '../../store/session';
import { VscEdit } from 'react-icons/vsc'
import './Settings.css'

function Settings(){
    const dispatch = useDispatch()

    const user = useSelector(state => state.session.user)

    const [showEditTitle, setShowEditTitle] = useState(false)
    const [title, setTitle] = useState(user.name)
    const [showEditPosition, setShowEditPosition] = useState(false)
    const [position, setPosition] = useState(user.position)

    const cancelTitleEdit = () => {
        setTitle(user.name)
        setShowEditTitle(false)
    }

    const cancelPositionEdit = () => {
        setPosition(user.position)
        setShowEditPosition(false)
    }

    const handleTitleSubmit = async () => {
        const firstName = title.split(' ')[0]
        const lastName = title.split(' ').slice(1).join(' ') 
        await dispatch(editName({id: user.id, name: title, firstName, lastName}))
        setShowEditTitle(false)
    }

    const handlePositionSubmit = async () => {
        await dispatch(editPosition({id: user.id, position}))
        setShowEditPosition(false)
    }

    return (
        <div className='settings-container'>
            <div className='settings-user-container'>
                {showEditTitle 
                    ? 
                    <div className='ol-input setting-input'>
                        <input 
                            name='title'
                            type="text" 
                            placeholder=' '
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <label htmlFor="title">Name</label>
                        <button className='s-submit' onClick={handleTitleSubmit} >Submit</button>
                        <button className='s-cancel' onClick={cancelTitleEdit}>Cancel</button>
                    </div>
                    :
                    <div className='s-name'>
                        <p>{user.name}</p>
                        <VscEdit className='s-edit'  onClick={() => setShowEditTitle(true)}/>
                    </div>
                }
                {showEditPosition
                ?
                    <div className='ol-input setting-input'>
                        <input
                            placeholder=' '
                            name='pos'
                            type="text"
                            value={position}
                            onChange={(e) => setPosition(e.target.value)}
                        />
                        <label htmlFor="pos">Position</label>
                        <button className='s-submit' onClick={handlePositionSubmit} >Submit</button>
                        <button className='s-cancel' onClick={cancelPositionEdit}>Cancel</button>
                    </div>
                :
                    <div className='s-pos'>
                        <p>{user.position}</p>
                        <VscEdit  className='s-edit' onClick={() => setShowEditPosition(true)} />
                    </div>
                }
                <div>
                    <div className='settings-avatar blank-setting-avatar' style={{backgroundImage: `url('${user.avatar}')`}}/>
                </div>
            </div>
        </div>
    );
};

export default Settings;