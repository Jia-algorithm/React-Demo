import React from 'react';
import logo from '../asset/logo.svg';
import music from '../asset/Missyou.mp3'
import music_on from '../asset/music-on.svg';
import music_off from '../asset/music-off.svg';
import './Heading.css';

class Heading extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            iMusicOn: false,
        };
    }

    audio = React.createRef();

    clickMusicIcon() {
        if (this.state.iMusicOn) {
            this.setState({
                iMusicOn: false,
            }, () => {
                this.audio.current.pause();
            });
        } else {
            this.setState({
                iMusicOn: true,
            }, () => {
                this.audio.current.play();
            });
        }
    }

    render(){
        return (
            <div className="heading-content">
                <div className="heading-left">
                    <img src={logo} width="30px" height="30px"/>
                    <div className="music-play" onClick={() => this.clickMusicIcon()}>
                        <img width="30px" height="30px" src={this.state.iMusicOn ? music_on : music_off}/>
                        <audio ref={this.audio} src={music}/>
                    </div>
                </div>
                <h1 className="heading-title">{this.props.title}</h1>
                <div className="heading-right">Hi, {this.props.player ? this.props.player : 'Stranger'}</div>
            </div>
        );
    }
}

export default Heading;