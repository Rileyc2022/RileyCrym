/**
 * @author Riley
 * @classdesc An object that stores an entry of a recently used tool
 * @class
 */

class Recents {

  /**
   * Initializes an entry
   * @constructor
   */
  constructor() {
    this.record = [];
  }

  add(tool, timestamp){
    let entry = {
      tool: tool,
      timestamp: timestamp
    }
    this.record.push(entry)
    console.log("entry added recents is now: ", this.record)
  }

  toArray(){
    return this.record
  }

  reBuild(array){
    this.record = array
  }

}

