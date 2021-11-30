const totalWidth = 600;


const config = [{
    width: totalWidth / 3,
    heigh: totalWidth / 3,
},
{
    width: totalWidth / 6,
    heigh: totalWidth / 6
},
{
    width: totalWidth / 12,
    heigh: totalWidth / 12
}]

/**
 * 3 album covers in large scale in 1 row (3 per row)
 * 12 albums covers in medium scale in 2 rows (6 per row)
 * 36 album covers in small scale in 3 rows (12 per row)
 * Total of 51 albums covers
 */
const layoutLarge = Array(3).fill(config[0]);
const layoutMedium = Array(12).fill(config[1]);
const layoutSmall = Array(36).fill(config[2]);


const layout = layoutLarge.concat(layoutMedium, layoutSmall);

export default layout;