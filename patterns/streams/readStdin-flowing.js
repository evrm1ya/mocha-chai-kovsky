process.stdin
  .on('data', chunk => {
    console.log(`Chunk read: (${chunk.length}) "${chunk.toString()}"`);
  })
  .on('end', () => {
    process.stdout.write('End of stream');
  });
