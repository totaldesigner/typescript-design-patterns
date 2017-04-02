module Builder {
  class Shop {
    private _vehicleBuilder: VehicleBuilder;

    public Construct(vehicleBuilder: VehicleBuilder): void {
      this._vehicleBuilder = vehicleBuilder;

      this._vehicleBuilder.BuildFrame();
      this._vehicleBuilder.BuildEngine();
      this._vehicleBuilder.BuildWheels();
      this._vehicleBuilder.BuildDoors();
    }

    public ShowVehicle(): void {
      this._vehicleBuilder.vehicle.display();
    }
  }

  class VehicleBuilder {
    private _vehicle: Vehicle = null;
    constructor(public vehicleType: VehicleType) {
      this._vehicle = new Vehicle(vehicleType);
    }

    public get vehicle(): Vehicle {
      return this._vehicle;
    }

    public BuildFrame(): void {
      throw new Error("Not implemented.");
    }

    public BuildEngine(): void {
      throw new Error("Not implemented.");
    }

    public BuildWheels(): void {
      throw new Error("Not implemented.");
    }

    public BuildDoors(): void {
      throw new Error("Not implemented.");
    }
  }

  class CarBuilder extends VehicleBuilder {
    constructor() {
      super(VehicleType.Car);
    }

    public BuildFrame(): void {
      this.vehicle.parts[PartType.Frame] = "Car Frame";
    }

    public BuildEngine(): void {
      this.vehicle.parts[PartType.Engine] = "2500 cc";
    }

    public BuildWheels(): void {
      this.vehicle.parts[PartType.Wheel] = "4";
    }

    public BuildDoors(): void {
      this.vehicle.parts[PartType.Door] = "4";
    }
  }

  class MotorCycleBuilder extends VehicleBuilder {
    constructor() {
      super(VehicleType.MotorCycle);
    }

    public BuildFrame(): void {
      this.vehicle.parts[PartType.Frame] = "MotorCycle Frame";
    }

    public BuildEngine(): void {
      this.vehicle.parts[PartType.Engine] = "500 cc";
    }

    public BuildWheels(): void {
      this.vehicle.parts[PartType.Wheel] = "2";
    }

    public BuildDoors(): void {
      this.vehicle.parts[PartType.Door] = "0";
    }
  }

  class ScooterBuilder extends VehicleBuilder {
    constructor() {
      super(VehicleType.Scooter);
    }

    public BuildFrame(): void {
      this.vehicle.parts[PartType.Frame] = "Scooter Frame";
    }

    public BuildEngine(): void {
      this.vehicle.parts[PartType.Engine] = "50 cc";
    }

    public BuildWheels(): void {
      this.vehicle.parts[PartType.Wheel] = "2";
    }

    public BuildDoors(): void {
      this.vehicle.parts[PartType.Door] = "0";
    }
  }

  class Vehicle {
    constructor(public vehicleType: VehicleType) {
      this.vehicleType = vehicleType;
    }

    private _parts: {} = {};
    public get parts(): {} {
      return this._parts;
    }

    public display() {
      console.log("---------------------------");
      console.log("Vehicle Type : " + VehicleType[this.vehicleType]);
      console.log("Frame :" + this.parts[PartType.Frame]);
      console.log("Engine :" + this.parts[PartType.Engine]);
      console.log("#Wheels :" + this.parts[PartType.Wheel]);
      console.log("#Doors :" + this.parts[PartType.Door]);
      console.log("---------------------------");
    }
  }

  enum VehicleType {
    Car,
    Scooter,
    MotorCycle
  }

  enum PartType {
    Frame,
    Engine,
    Wheel,
    Door
  }

  window.addEventListener("load", function () {
    var shop = new Shop();

    shop.Construct(new ScooterBuilder());
    shop.ShowVehicle();

    shop.Construct(new CarBuilder());
    shop.ShowVehicle();

    shop.Construct(new MotorCycleBuilder());
    shop.ShowVehicle();
  });
}