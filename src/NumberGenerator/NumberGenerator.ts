interface NumberGenerator {
    /**
     * Returns an integer between 0 and max-1 (inclusive)
     */
    getInteger(max: number): number;
}

export default NumberGenerator;