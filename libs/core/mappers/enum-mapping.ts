/** Provide mapping enum model and enum dto. */
export interface EnumMapping<TDto, TModel> {

	/** Enum model. */
	readonly model: TModel;

	/** Enum dto. */
	readonly dto: TDto;
}
