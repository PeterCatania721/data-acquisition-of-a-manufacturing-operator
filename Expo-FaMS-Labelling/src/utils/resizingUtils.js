// External imports
import {Platform, PixelRatio} from 'react-native';

// normaliye the size of the text
export function normalize(size, SCREEN_WIDTH) {
    // based on iphone 5s's scale
    const scale = SCREEN_WIDTH / 320;

    const newSize = size * scale 
    if (Platform.OS === 'ios') {
        return Math.round(PixelRatio.roundToNearestPixel(newSize))
    } else {
        return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
    }
}