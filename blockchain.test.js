
const Blockchain = require('./blockchain')
const Block = require('./block')

describe('Blockchain', () => {
  let blockchain, newChain, originalChain

  beforeEach(() => {
    blockchain = new Blockchain()
    newChain = new Blockchain()
    originalChain = blockchain.chain
  })

  it('contains a `chain` Array instance', () => {
    expect(blockchain.chain instanceof Array).toBe(true)
  })

  it('starts with the genesis block', () => {
    expect(blockchain.chain[0]).toEqual(Block.genesis())
  })

  it('it adds a new block to the chain', () => {
    const newData = 'foo bar'
    blockchain.addBlock({ data: newData })
    expect(blockchain.chain[blockchain.chain.length - 1].data).toEqual(newData)
  })

  describe('isValidChain()', () => {
    describe('wheen the chain does not start with the genisis block', () => {
      it('returns false', () => {
        blockchain.chain[0] = { data: 'fake-genesis' }
        expect(Blockchain.isValidChain(blockchain.chain)).toBe(false)
      })
    })

    describe('wheen the chain start with the genisis block and has multiple blocks', () => {
      beforeEach(() => {
        blockchain.addBlock({ data: 'Beers' })
        blockchain.addBlock({ data: 'Beets' })
        blockchain.addBlock({ data: 'Battlestar Galatica' })
      })
      describe('and a lastHash reference has changed', () => {
        it('returns false', () => {
          blockchain.chain[2].lastHash = 'broken-lastHash'
          expect(Blockchain.isValidChain(blockchain.chain)).toBe(false)
        })
      })

      describe('where the chain contains a block with invalid field', () => {
        it('returns false', () => {
          blockchain.chain[2].data = 'some-bad-evel-data'
          expect(Blockchain.isValidChain(blockchain.chain)).toBe(false)
        })
      })

      describe('and the chain does not contain any invalid block', () => {
        it('returns true', () => {
          expect(Blockchain.isValidChain(blockchain.chain)).toBe(true)
        })
      })
    })
  })

  describe('replaceChain()', () => {
    describe('when the new chain is not longer', () => {
      it('does not replace the chain', () => {
        newChain.chain[0] = { new: 'chain' }
        blockchain.replaceChain(newChain.chain)
        expect(blockchain.chain).toEqual(originalChain)
      })
    })

    describe('when the new chain is longer', () => {
      beforeEach(() => {
        newChain.addBlock({ data: 'Beers' })
        newChain.addBlock({ data: 'Beets' })
        newChain.addBlock({ data: 'Battlestar Galatica' })
      })
      describe('and the chain is invalid', () => {
        it('does not replace the chain', () => {
          newChain.chain[2].hash = 'some-fake-hash'
          blockchain.replaceChain(newChain.chain)
          expect(blockchain.chain).toEqual(originalChain)
        })
      })

      describe('and the chain is valid', () => {
        it('replace the chain', () => {
          blockchain.replaceChain(newChain.chain)
          expect(blockchain.chain).toEqual(newChain.chain)
        })
      })
    })
  })
})
