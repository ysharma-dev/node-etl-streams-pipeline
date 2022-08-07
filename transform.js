const { Transform } = require('stream')

const transformStream = new Transform({
    transform: function(chunk, encoding, callback) {
        try {
            const transformedChunk = transformChunk(chunk)
            callback(null, JSON.stringify(transformedChunk, null, 2))
        } catch (error) {
            callback(error)
        }
    }
})
const transformChunk = (objectToTransform) => {
    return {
        name: objectToTransform.pl_name,
        discoveryMethod: objectToTransform.discoverymethod,
        facility: objectToTransform.disc_facility,
        neighbors: objectToTransform.sy_pnum,
        orbitsInDays: objectToTransform.pl_orbper,
        orbitsInDaysError: computeErrorThreshold(
            objectToTransform.pl_orbpererr1,
            objectToTransform.pl_orbpererr2
        ),
        lastUpdate: objectToTransform.rowupdate,
        hostStar: objectToTransform.hostname
    }
}

const computeErrorThreshold = (err1, err2) => {
    if (err1 === null || err2 === null) {
        return null;
    } else if (Math.abs(err1) === Math.abs(err2)) {
        return `±${err1}`;
    } else {
        const max = Math.max(err1, err2);
        const min = Math.min(err1, err2);
        return `+${max}/${min}`;
    }
}

module.exports = { transformStream }