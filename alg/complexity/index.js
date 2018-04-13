const nums = [1, 2, 3, 3, 4, 5];

// n^2
function hasDuplicates(nums) {
  // O(n)
  for (let i = 0; i < nums.length; i++) {

    // O(n^2)
    for (let j = 0; j < nums.length; j++) {
      if (j === i) {
        continue;
      }

      if (nums[j] === nums[i]) {
        return true;
      }
    }
  }

  return false;
}

console.log(hasDuplicates(nums));

function searchFor(nums, num) {
}

// O(n logn)
function hasDuplicates2(nums) {
  for (let num of nums) {
    if (searchFor(nums, num)) {
      return true;
    }
  }

  return false;
}

// One duplicate assumed
// O(n)
function findDuplicate(ary) {
  const actualSum = ary.reduce((a, b) => a + b, 0);
  const lastItem = ary[ary.length - 1];

  // gauss
  const shouldBe = lastItem * (lastItem + 1) / 2;

  return actualSum - shouldBe;
}

console.log(findDuplicate(nums));
