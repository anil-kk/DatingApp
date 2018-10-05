using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using DatingApp.API.Data;
using DatingApp.API.Dtos;
using DatingApp.API.Helpers;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace DatingApp.API.Controllers
{
    [Authorize]
    [Route("api/users/{userId}/[controller]")]
    [ApiController]
    public class PhotosController : ControllerBase
    {
        private readonly IDatingRepository _repository;
        private readonly IMapper _mapper;
        private readonly IOptions<Helpers.CloudinarySettings> _cloudinaryConfig;
        private Cloudinary _cloudinary;
        private readonly IDatingRepository _repo;
        public PhotosController(IDatingRepository repository, IMapper mapper, IOptions<CloudinarySettings> cloudinaryConfig, IDatingRepository repo)
        {
            _repo = repo;
            _cloudinaryConfig = cloudinaryConfig;
            _mapper = mapper;
            _repository = repository;

            Account acc = new Account(
                _cloudinaryConfig.Value.CloudName,
                _cloudinaryConfig.Value.ApiKey,
                _cloudinaryConfig.Value.ApiSecret
            );

            _cloudinary = new Cloudinary(acc);
        }

        [HttpGet("{id}", Name = "GetPhoto")]
        public async Task<IActionResult> GetPhoto(int id)
        {
            var photoFromRepo = await _repo.GetPhoto(id);
            var photoToReturn = _mapper.Map<PhotoForReturnDto>(photoFromRepo);
            return Ok(photoToReturn);

        }

        [HttpPost]
        public async Task<IActionResult> AddPhotoForUser([FromRoute] int userId, [FromForm] PhotoForCreationDto photoForCreationDto)
        {

            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }

            var userFromRepo = await _repo.GetUser(userId);
            var file = photoForCreationDto.File;
            var uploadResult = new ImageUploadResult();

            if (file.Length > 0)
            {
                using (var inputStream = file.OpenReadStream())
                {
                    var uploadParams = new ImageUploadParams()
                    {
                        File = new FileDescription(file.Name, inputStream),
                        Transformation = new Transformation()
                        .Width(500).Height(500).Crop("fill").Gravity("face")
                    };

                    uploadResult = _cloudinary.Upload(uploadParams);
                }
            }

            photoForCreationDto.Url = uploadResult.Uri.ToString();
            photoForCreationDto.PublicId = uploadResult.PublicId;

            var photo = _mapper.Map<Photo>(photoForCreationDto);

            if (!userFromRepo.Photos.Any(p => p.IsMain))
            {
                photo.IsMain = true;
            }

            userFromRepo.Photos.Add(photo);


            if (await _repo.SaveAll())
            {
                var photoToReturn = _mapper.Map<PhotoForReturnDto>(photo); // wait until id is created for our new resource
                return CreatedAtRoute("GetPhoto", new { id = photo.Id }, photoToReturn);
            }

            return BadRequest("Some thing went wrong while adding photo! try again later");
        }

        [HttpPost("{id}/setMain")]
        public async Task<IActionResult> SetMainPhoto(int userId, int id)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }

            var userFromRepo = await _repo.GetUser(userId);
            if (!userFromRepo.Photos.Any(p => p.Id == id))
            {
                return Unauthorized();
            }

            var photoFromRepo = await _repo.GetPhoto(id);

            if (photoFromRepo.IsMain)
            {
                return BadRequest("This is already the main picture!");
            }

            var currentMainUserPhoto = await _repo.GetMainPhotoForUser(userId);
            if (currentMainUserPhoto != null)
            {
                currentMainUserPhoto.IsMain = false;
            }
            photoFromRepo.IsMain = true;
            if (await _repo.SaveAll())
            {
                return NoContent();
            }
            return BadRequest("Some thing went wrong to set a main image! tray later again!");

        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePhoto(int userId, int id)
        {

            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }

            var userFromRepo = await _repo.GetUser(userId);
            if (!userFromRepo.Photos.Any(p => p.Id == id))
            {
                return Unauthorized();
            }

            var photoFromRepo = await _repo.GetPhoto(id);

            if (photoFromRepo.IsMain)
            {
                return BadRequest("You can not delete your main pictures!");
            }

            if (photoFromRepo.PublicId != null)
            {
                var result = _cloudinary.Destroy(new DeletionParams(photoFromRepo.PublicId));

                if (result.Result == "ok")
                {
                    _repo.Delete(photoFromRepo);
                }
            }

            if (photoFromRepo.PublicId == null)
            {
                _repo.Delete(photoFromRepo);
            }


            if (await _repo.SaveAll())
            {
                return Ok();
            }

            return BadRequest("Something went wrong in deleting the photo! Try again later!");

        }

    }
}