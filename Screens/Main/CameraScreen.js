import React, { useState } from 'react';

import RecordVideo from '../../Components/Camera/RecordVideo';
import PickVideo from '../../Components/Camera/PickVideo';

const CameraScreen = () => {
    // 직접 녹화 or 불러오기
    const [isRecordMode, setIsRecordMode] = useState(true);

    if (isRecordMode) {
        return <RecordVideo setIsRecordMode={setIsRecordMode} />
    } else {
        return <PickVideo />
    }
    
};

export default CameraScreen;