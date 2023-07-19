/* eslint-disable */

export const generateScrollHandler = (frames, locoScrollInstance) => {
    const scrollFrames = frames;

    let currentIndex = 0;
    let state = true;

    let isAnimating = false;
    const getIsAnimating = () => isAnimating;
    const setIsAnimating = val => isAnimating = val;
    const setCurrentIndex = val => currentIndex = val;
    const setState = val => state = val;
    const getCurrentIndex = () => currentIndex;
    const getCurrentFrame = () => scrollFrames[getCurrentIndex()];
    const scrollDirFunc = (dir) => {
        if(dir === 'up' && state){
            currentIndex -= 1;
        }else if(dir === 'down' && state){
            currentIndex += 1;
        }
    };

    let timeout;

    const handleTimer = () => {
        clearTimeout(timeout);
        locoScrollInstance.stop();
        timeout = setTimeout(() => {
            setIsAnimating(false);
            locoScrollInstance.start();
        }, 700);
    }

    return {
        setCurrentIndex,
        getIsAnimating,
        setIsAnimating,
        getCurrentIndex,
        scrollDirFunc,
        setState,
        getCurrentFrame,
        handleTimer,
    }
}