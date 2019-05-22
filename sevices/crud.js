
class CrudService {
	constructor(repository, errors) {
		this.repository = repository;
		this.errors = errors;

		this.defaults = {
			readChunk: {
				limit: 10,
				page: 1,
				order: "desc",
				orderField: "id"
			}
		};
	}

	async readChunk(
		options = this.defaults.readChunk,
		repository = this.repository,
		filter = null
	) {
		options = { ...this.defaults.readChunk, ...options };

		let limit = options.limit;
		let offset = (options.page - 1) * options.limit;

		let data = await repository.findAndCountAll({
			where: { ...filter },
			raw: true,
			limit: limit,
			offset: offset,
			order: [[options.orderField, options.order.toUpperCase()]]
		});

		options.pages = Math.ceil(data.count / limit);

		return {
			data: data.rows,
			meta: options,
		}
	}

	async read(id) {
		id = parseInt(id);

		if (isNaN(id)) {
			throw this.errors.invalidId;
		}

		const item = await this.repository.findById(id, { raw: true });

		if (!item) {
			throw this.errors.notFound;
		}

		return item;
	}

	async create(data) {
		const item = await this.repository.create(data);

		return await item.get({ plain: true });
	}

	async update(id, data) {

		id = parseInt(id);
		await this.repository.update(data, { where: { id }, limit: 1 });

		return await this.read(id);
	}

	async delete(id) {
		id = parseInt(id);
		return await this.repository.destroy({ where: { id } });
	}

	
}

module.exports = CrudService;
