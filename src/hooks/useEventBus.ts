import globalEventBus from '../utils/globalEventBus';

export const useEventBus = () => {
    return {
        on: globalEventBus.on.bind(globalEventBus),
        off: globalEventBus.off.bind(globalEventBus),
        emit: globalEventBus.emit.bind(globalEventBus),
    };
};
