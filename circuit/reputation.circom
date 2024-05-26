pragma circom 2.1.6;

function NeededBits (n) {
    if (n == 0) return 1;
    var b = 0, res = n;
    while (res != 0) {
        res >>= 1;
    b++;
    }
    return b;
}

template AddMaxbitArrayTag(n,m) {
    signal input in[m];
    signal output {maxbit} out[m];

    out.maxbit = n;

    for (var i = 0; i < m; i++) {
       _ <== Num2Bits(n)(in[i]);
    }
    
    in ==> out;
}

template Num2Bits(n) {
    signal input in;
    signal output {binary} out[n];

    var lc1=0;
    var e2=1;
    for (var i = 0; i<n; i++) {
        out[i] <-- (in >> i) & 1;
        out[i] * (out[i] -1 ) === 0;
        lc1 += out[i] * e2;
        e2 = e2+e2;
    }

    lc1 === in;
}

// n is the number of bits the input  have.
// Only works if the distance between the two numbers is less than 2^n (TODO check)
template LessThan(n) {
    assert(n < NeededBits(-1) - 1); // To be sure the check works
    signal input in[2];
    signal output {binary} out;

    var aux[n+1] = Num2Bits(n+1)(in[0]+ (1<<n) - in[1]);
    out <== 1-aux[n];
}

// n is the number of bits the input  have.
// Only works if the distance between the two numbers is less than 2^n (TODO check)
template GreaterThan(n, submissionThreshold) {
    signal input in;
    signal output {binary} out;
    
    var aux[2];
    aux[0] = submissionThreshold;
    aux[1] = in;
    LessThan(n)(aux) ==> out;
}

template ReputationProof (submissionThreshold) {
    signal input totalSubmissions;
    signal output {binary} out;
    out <== GreaterThan(32, submissionThreshold)(totalSubmissions);

    out === 1;
}

component main = ReputationProof(15);