import Debug "mo:base/Debug";
import Float "mo:base/Float";
// import Nat "mo:base/Nat";
// import Int "mo:base/Int";
import Time "mo:base/Time";
//Import Motoko library

actor Dbank {
  
  stable var currentValue: Float = 3000;
  // currentValue := 1000;
  // Debug.print(debug_show(currentValue));

  stable var startTime = Time.now();
  // Debug.print(debug_show(currentTime));
  //  let id = 354831362; // Variable unmmutable
  //  Debug.print(debug_show(id));

  public func increaseValue(amount: Float) {
    if (amount <= 0) {
      Debug.print("Invalid deposit amount");
      return;
    };
    currentValue += amount;
  };

  public func decreaseValue(amount: Float) {
    let tempValue = currentValue - amount;
    if(tempValue >=0){
    currentValue -= amount;
    Debug.print(debug_show( currentValue));
  }else{
    Debug.print("Amount too large, currentValue less than zero.")
  }
  };

public query func checkBalance(): async Float{
  return currentValue;
};

public func compound() {
    let currentTime = Time.now();
    let timeElapsedNano = currentTime - startTime;
    let timeElapsedYears = Float.fromInt(timeElapsedNano) / 1_000_000_000.0 / 60.0 / 60.0 / 24.0 / 365.25;
    
    // More accurate compound interest calculation
    let interestRate = 0.01; // 1% annual
    currentValue := currentValue * (1.0 + interestRate) ** timeElapsedYears;
    startTime := currentTime;
    
    // Ensure balance never goes negative
    if (currentValue < 0) {
        currentValue := 0.0;
    }
}

}
