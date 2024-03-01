export default function page() {
  return (
    <div>
      page
      <form action="">
        <label htmlFor="hourlyPrice"></label>
        <input
          type="number"
          name="hourlyPrice"
          id="hourlyPrice"
          required
          placeholder="hourlyPrice"
        />
        <label htmlFor="hoursVolume"></label>
        <input
          type="number"
          name="hoursVolume"
          id="hoursVolume"
          required
          placeholder="hoursVolume"
        />
        <label htmlFor="startDate"></label>
        <input
          type="date"
          name="startDate"
          id="startDate"
          required
          placeholder="startDate"
        />
        <label htmlFor="endDate"></label>
        <input
          type="date"
          name="endDate"
          id="endDate"
          required
          placeholder="endDate"
        />
        <input type="submit" value="submit" required />
      </form>
    </div>
  );
}
