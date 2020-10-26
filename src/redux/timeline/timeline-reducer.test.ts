import timelineReducer, {TTimelineInitialState} from "./timeline-reducer";

describe('Timeline reducer', () => {
    let state: TTimelineInitialState;

    beforeEach(() => {
        state = {
            postData: [],
            uploadedFiles: []
        }
    });

    test('should return initial value', () => {
        // @ts-ignore
        const newState = timelineReducer(state, {type: 'FAKE'});

        expect(newState).toEqual(state);
    });
});