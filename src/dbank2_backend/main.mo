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
    currentValue += amount;
    Debug.print(debug_show( currentValue));
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

public func compound(){
    let currentTime = Time.now();
    let timeElapsedNanoSTS = currentTime - startTime;
    let _timeElapsedS = timeElapsedNanoSTS / 1000000000; // Converting the nano seconds into seconds 
    currentValue := currentValue * (0.05 ** Float.fromInt(_timeElapsedS));
    startTime := currentTime;
}

}