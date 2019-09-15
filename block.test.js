const Block = require('./block')
const cryptoHash = require('./crypto-hash')
const { GENESIS_DATA } = require('./config')
describe('Block', () => {
  const timestamp = 'a-date'
  const lastHash = 'foo-hash'
  const hash = 'bar-hash'
  const data = ['blockchain', 'data']
  const block = new Block({ timestamp, lastHash, hash, data })

  it('has a timestamp, lastHash, hash, and data property', () => {
    expect(block.timestamp).toEqual(timestamp)
    expect(block.lastHash).toEqual(lastHash)
    expect(block.hash).toEqual(hash)
    expect(block.data).toEqual(data)
  })

  describe('genesis()', () => {
    const genesisBlock = Block.genesis()

    it('returns a block instance', () => {
      expect(genesisBlock instanceof Block).toBe(true)
    })

    it('returns the genesis data', () => {
      expect(genesisBlock).toEqual(GENESIS_DATA)
    })
  })

  describe('mineBlock()', () => {
    const lastBlock = Block.genesis
    const data = 'mined block'
    const minedBlock = Block.mineBlock({ lastBlock, data })

    it('returns Block instance ', () => {
      expect(minedBlock instanceof Block).toBe(true)
    })

    it('sets `lasthash` to be the `hash` of the lastBlock', () => {
      expect(minedBlock.lastHash).toEqual(lastBlock.hash)
    })

    it('sets the `data`', () => {
      expect(minedBlock.data).toEqual(data)
    })

    it('sets a `timeStamp`', () => {
      expect(minedBlock.timestamp).not.toEqual(undefined)
    })

    it('creates a SHA-256  `hash` based on the proper inputs', () => {
      expect(minedBlock.hash).toEqual(cryptoHash(minedBlock.timestamp, lastBlock.hash, data))
    })
  })
})
