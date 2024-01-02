
import Image from 'next/image'
import svgNoData from '../../public/images/no-data.svg'

function NoData({ width, height }) {
    return (
        <>
            <Image priority src={svgNoData} alt='no data' width={width} height={height} />
        </>
    );
}

export default NoData