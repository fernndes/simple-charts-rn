const data = [
    { label: 'Jan', value: 500 },
    { label: 'Feb', value: 312 },
    { label: 'Mar', value: 424 },
    { label: 'Apr', value: 745 },
    { label: 'May', value: 89 },
    { label: 'Jun', value: 434 },
    { label: 'Jul', value: 650 },
    { label: 'Aug', value: 980 },
    { label: 'Sep', value: 503 },
    { label: 'Oct', value: 186 },
    { label: 'Nov', value: 689 },
    { label: 'Dec', value: 643 }
  ]
  

const points = data.map(function (item, index) {
    return [(index + 1) * 10, item.value]
  })

  const points2 = data.map(function (item, index) {
    if(index==0) {
      return (`M${(index + 1) * 10} 0 L${(index + 1) * 10}${' '}${-item.value}`)
    }
    if(index==data.length-1) {
      return (`L${(index + 1) * 10}${' '}${-item.value} L${(index + 1) * 10} 0`)
    }
    return (`L${(index + 1) * 10}${' '}${-item.value}`)
  })

  const join = points2.join(' ')
console.log(join)