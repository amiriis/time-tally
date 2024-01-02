
import Image from 'next/image'

function NoData({ width, height }) {
    return (
        <>
            <Image priority src={'/images/no-data.svg'} alt='no data' width={width} height={height} />
        </>
    );
}

export default NoData